import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mark-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-generator.html',
  styleUrl: './mark-generator.css'
})
export class MarkGeneratorComponent {
  dueDate: string = '';        // Now empty for the user to select
  submissionDate: string = '';
  maxMarks: number = 100;
  finalMarks: number | null = null;
  status: string = '';

  generateMarks() {
    if (!this.dueDate || !this.submissionDate) {
      alert('Please select both the Due Date and the Submission Date!');
      return;
    }

    const due = new Date(this.dueDate).getTime();
    const sub = new Date(this.submissionDate).getTime();
    
    // Difference in milliseconds converted to days
    const diffTime = sub - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      this.finalMarks = this.maxMarks;
      this.status = 'Submitted On Time (Full Marks!)';
    } else {
      const penalty = diffDays * 10;
      this.finalMarks = Math.max(0, this.maxMarks - penalty);
      this.status = `Late by ${diffDays} day(s)`;
    }
  }
}
