import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anime } from '../../models/anilist-response.model';
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    SlicePipe
  ],
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.scss']
})
export class AnimeCardComponent {
  @Input() anime!: Anime;
  @Input() index?: number;
  @Input() showRanking: boolean = false;
  @Input() showReleaseDate: boolean = true;
  @Input() username?: string;
  @Input() inMyList: boolean = false;
  @Input() status: string = '';
  @Input() showActions: boolean = true;

  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() editStatus = new EventEmitter<void>();
  @Output() showDetails = new EventEmitter<void>();

  expanded: boolean = false;

  onAdd() { this.add.emit(); }
  onRemove() { this.remove.emit(); }
  onEditStatus() { this.editStatus.emit(); }
  onShowDetails() { this.expanded = !this.expanded; this.showDetails.emit(); }
}
