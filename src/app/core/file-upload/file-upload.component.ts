import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardService } from '../../card.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cardService: CardService,
  ) {}

  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileText = await input.files[0].text();
      this.cardService.importFile(fileText);
      input.value = ""
    }
  }
}
