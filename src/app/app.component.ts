import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from './services/api.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  constructor(private api: ApiService) { }

  images = [
    'assets/_.png',
    // 'assets/slide3.png',
    // 'assets/slide4.png',
    // 'assets/slide5.png'
  ];
  currentIndex = 0;

  formData = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }

  ngAfterViewInit(): void {
    this.fixLeafletIcons();
    setTimeout(() => this.initializeMap(), 500); // delay to let DOM fully load
  }


  sendMessageMongo() {
    this.api.sendMessage(this.formData).subscribe({
      next: () => alert('Message sent!'),
      error: err => console.error('Send error:', err)
    });
  }

  fixLeafletIcons(): void {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });
  }


  initializeMap(): void {
    const map = L.map('map', {
      center: [37.5121, 22.3794],
      zoom: 15,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([37.5121, 22.3794])
      .addTo(map)
      .bindPopup('George Ziaziaris - Mathematics Tutoring')
      .openPopup();

    // Force Leaflet to recalculate map container size
    setTimeout(() => map.invalidateSize(), 500);
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendMessage(name: string, email: string, message: string): void {
    const subject = `Math Tutoring Inquiry from ${name}`;
    const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${message}`;
    window.location.href = `mailto:geoziaziaris@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
