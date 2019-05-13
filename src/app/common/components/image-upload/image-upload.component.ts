import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from './image-upload.service';

class FileSnippet{

  pending : boolean = false;
  status: string = 'INIT';

  constructor(public src :string, public file: File ){
  }
}

@Component({
  selector: 'bwm-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent  {

  selectedFile: FileSnippet;

constructor(private imageService: ImageUploadService) { }

  private onSuccess(){
    this.selectedFile.pending = false;
    this.selectedFile.status = "OK";

  }

  private onFailure(){
    this.selectedFile.pending = false;
    this.selectedFile.status = "FAIL";
  }

  processFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event:any) =>{
      this.selectedFile = new FileSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (imageUrl:string) =>{
          debugger;
          this.onSuccess();
        },
        () =>{
          this.onFailure();
        })
    });
    reader.readAsDataURL(file);
  }

}
