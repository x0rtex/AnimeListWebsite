import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Anime } from '../../models/anilist-response.model';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-anime-list-modal',
  standalone: true,
  templateUrl: './anime-list-modal.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./anime-list-modal.component.scss']
})
export class AnimeListModalComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() anime: Anime | null = null;
  @Input() action: 'add' | 'edit' | 'remove' | null = null;
  @Input() currentStatus: string = 'Watching';
  @Input() statusOptions: string[] = ['Watching', 'Watched', 'Unwatched'];

  @Output() confirm: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  selectedStatus: string = this.currentStatus;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStatus']) {
      this.selectedStatus = this.currentStatus;
    }
  }

  onConfirm(): void {
    this.confirm.emit(this.selectedStatus);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
