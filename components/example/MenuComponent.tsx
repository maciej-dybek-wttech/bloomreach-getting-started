import React, {useContext} from 'react';
import {isMenu, Menu as BrMenu, MenuItem, Reference, TYPE_LINK_EXTERNAL} from '@bloomreach/spa-sdk';
import {BrComponentContext, BrManageMenuButton, BrPageContext} from '@bloomreach/react-sdk';
import Link from 'next/link';
import {Icon} from './Icon';


interface MenuModels {
  menu: Reference;
}

interface MenuItemProps {
  icon: string;
}


export function MenuComponent() {
  const component = useContext(BrComponentContext);
  const page = useContext(BrPageContext);
  const menuRef = component?.getModels<MenuModels>()?.menu;
  const menu = menuRef && page?.getContent<BrMenu>(menuRef);

  if (!isMenu(menu)) {
    return null;
  }

  return (
    <div>
      <BrManageMenuButton menu={menu}/>
      <ul className={`navbar-nav col-12 ${page!.isPreview() ? 'has-edit-button' : ''}`}>
        {menu.getItems().map((item, index) => (
          <li key={index} className={`nav-item ${item.isSelected() ? 'active' : ''}`}>
            <MenuLink item={item}/>
          </li>
        ))}
      </ul>
    </div>
  );
}


interface MenuLinkProps {
  item: MenuItem
}

function MenuLink({item}: MenuLinkProps): JSX.Element {
  const url = item.getUrl();

  if (!url) {
    return <span className="nav-link text-capitalize disabled">{item.getName()}</span>;
  }

  return (
    <Link className="nav-link text-capitalize" href={url}
          target={item.getLink()?.type === TYPE_LINK_EXTERNAL ? '_blank' : ''}>
      {item.getParameters().icon ? <Icon name={item.getParameters().icon}/> : null}
      {item.getName()}
    </Link>
  );
}
