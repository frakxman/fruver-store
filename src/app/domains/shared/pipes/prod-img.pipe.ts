import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'prodImgPipe'})
export class ProductImagePipe implements PipeTransform {

  imageDefault = 'assets/images/no-image.png';

  transform(url: string): string {
    if (!url) {
      return this.imageDefault;
    }
    return url;
  }

}
