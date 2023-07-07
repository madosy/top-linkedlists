import Node from "./node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  prepend(value) {
    let newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this.size += 1;
  }

  append(value) {
    let newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
  }

  at(index) {
    if (index > this.size) return null;
    if (index == 0) return this.head;
    else return this.at(index - 1).next;
  }

  pop() {
    this.tail = this.tail.previous;
    this.tail.next = null;
    this.size -= 1;
  }

  contains(value) {
    let isFound = false;
    let firstNode = this.head;

    while (firstNode !== null && isFound == false) {
      if (firstNode.value == value) isFound = true;
      firstNode = firstNode.next;
    }
    return isFound;
  }

  find(value) {
    let isFound = false;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && isFound == false) {
      if (currentNode.value == value) isFound = true;
      else {
        currentNode = currentNode.next;
        currentIndex += 1;
      }
    }
    return isFound ? currentIndex : null;
  }

  toString() {
    let currentNode = this.head;
    let outputString = "";
    while (currentNode !== null) {
      outputString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    return outputString + "null";
  }

  insertAt(value, index) {
    if (index >= this.size || index < 0) throw new Error("Enter valid index");
    if (index == this.size) {
      this.append(value);
    } else if (index == 0) {
      this.prepend(value);
    } else {
      let newNode = new Node(value);
      let old = this.at(index);
      newNode.previous = old.previous;
      newNode.next = old;
      old.previous.next = newNode;
      old.previous = newNode;
    }
    this.size += 1;
  }

  removeAt(index) {
    if (index > this.size || index < 0) throw new Error("Enter valid index");
    let old = this.at(index);
    if (index == this.size - 1) {
      this.pop();
      this.tail = old.previous;
    } else if (index == 0) {
      this.head = old.next;
      old.next.previous = null;
    } else {
      old.previous.next = old.next;
      old.next.previous = old.previous;
    }
    this.size -= 1;
  }
}

export default LinkedList;
