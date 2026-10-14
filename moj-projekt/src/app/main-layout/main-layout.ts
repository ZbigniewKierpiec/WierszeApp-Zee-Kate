import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Topbar } from '../features/editor/topbar/topbar';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../features/editor/sidebar/sidebar";

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, Topbar, RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
