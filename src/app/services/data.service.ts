import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private elements: Element[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', id: Date.now() },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', id: Date.now() + 1 },
  ];

  private elementsSubject = new BehaviorSubject<Element[]>(this.elements);
  elements$ = this.elementsSubject.asObservable();  // Expose as observable stream

  // Add a new element and update positions correctly
  addElement(element: Omit<Element, 'position' | 'id'>) {
    const newPosition = this.elements.length + 1; // Calculate position
    const newElement = { ...element, position: newPosition, id: Date.now() }; // Add new ID
    this.elements.push(newElement); // Add the element to the array

    this.elementsSubject.next([...this.elements]);  // Emit new array of elements
  }

  // Update an element by ID
  updateElement(updatedElement: Element) {
    const index = this.elements.findIndex(el => el.id === updatedElement.id);
    if (index !== -1) {
      this.elements[index] = { ...updatedElement, position: index + 1 };  // Ensure correct position
      this.elementsSubject.next([...this.elements]);  // Emit updated elements
    }
  }

  // Return current elements as observable
  getElements() {
    return this.elements$;  // Return BehaviorSubject's observable
  }
}
