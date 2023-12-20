import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typeToIcon' })
export class IconPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value === undefined) {
      return 'photo_library';
    }

    switch (value.toLowerCase()) {
      // TYPE audio
      case 'audio/mpeg':
      case 'audio/x-ms-wma':
      case 'audio/vnd.rn-realaudio':
      case 'audio/x-wav':
        return 'library_music';

      // TYPE image
      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
      case 'image/vnd.microsoft.icon':
      case 'image/x-icon':
      case 'image/vnd.djvu':
      case 'image/svg+xml':
        return 'photo_library';

      // TYPE video
      case 'video/mpeg':
      case 'video/mp4':
      case 'video/quicktime':
      case 'video/x-ms-wmv':
      case 'video/x-msvideo':
      case 'video/x-flv':
      case 'video/webm':
        return 'movie';

      default:
        return 'photo_library';
    }
  }
}
