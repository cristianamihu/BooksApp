import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentIndex = 0;
  slides = [
    { image: 'assets/images/poza4.jpeg' },
    { image: 'assets/images/poza5.jpeg' },
    { image: 'assets/images/poza3.jpeg' },
    { image: 'assets/images/poza1.jpeg' },
    { image: 'assets/images/poza2.jpg' }
  ];

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
