import {default as NextImage} from 'next/image'
import {Image} from '@bloomreach/spa-sdk';


type Props = {
  image: Image
  width?: number
  height?: number
}

const HbImage = ({image, width, height}: Props) => {

  const calculateAspectRatio = (image: Image) => {
    return image?.getWidth() / image?.getHeight();
  }

  const aspectRatio = calculateAspectRatio(image) || 1;

  const _width = (!width && height) ? height * aspectRatio : width;
  const _height = (!height && width) ? width / aspectRatio : height;

  return (
    image &&
    <NextImage
      src={image.getUrl()!}
      alt={image.getDisplayName()}
      width={_width}
      height={_height}
    />
  )
}

export default HbImage;
