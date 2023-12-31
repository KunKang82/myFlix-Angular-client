import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * dialog component for displaying genre details
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

    /**
   * @constructor is used to set dependencies
   * @param data - specific genre info, received from moviecard via MAT_DIALOG_DATA
   * @property {string} Name - name of genre
   * @property {string} Description - description of genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
        Name: string;
        Description: string;
      }
  ) {}

   /** this function implements OnInit when the component is initialized */
  ngOnInit(): void {}

}