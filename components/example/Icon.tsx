import {GiBowlingPin} from 'react-icons/gi';
import {AiFillStar, AiOutlineQuestionCircle} from 'react-icons/ai';

type IconProps = {
  name: any
}

export function Icon({name}: IconProps) {
  switch (name) {
    case
    'star'
    :
      return <AiFillStar/>
    case
    'pin'
    :
      return <GiBowlingPin/>
    default:
      return <AiOutlineQuestionCircle/>
  }
}
