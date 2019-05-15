import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
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

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();


  selectedFile: FileSnippet;

  imageChangedEvent : any;

constructor(private imageService: ImageUploadService) { }

  private onSuccess(imageUrl: string){
    this.selectedFile.pending = false;
    this.selectedFile.status = "OK";
    this.imageUploaded.emit(imageUrl);
  }

  private onFailure(){
    this.selectedFile.pending = false;
    this.selectedFile.status = "FAIL";
    this.imageError.emit('');
  }

  imageCropped(file : File): FileSnippet | File{
    if(this.selectedFile){
      return this.selectedFile.file = file;
    }
    return new FileSnippet('', file);
  }

  processFile(event: any){
    this.imageChangedEvent = event;
  }

  uploadImage(){
    if(this.selectedFile){
      const reader = new FileReader();
      reader.addEventListener('load', (event:any) =>{

        this.selectedFile.pending = true;

        this.imageService.uploadImage(this.selectedFile.file).subscribe(
          (imageUrl:string) =>{
            this.onSuccess(imageUrl);
          },
          () =>{
            this.onFailure();
          })
      });
      reader.readAsDataURL(this.selectedFile.file);
    }
  }

}
