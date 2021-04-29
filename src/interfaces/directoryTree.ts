import { Directory } from './directory';

export class DirectoryTree {
  _id: string;
  ancestor: string | Directory;
  descendant: string | Directory;
  depth: number;
  constructor({ _id, ancestor, descendant, depth }: DirectoryTree) {
    this._id = _id;
    this.ancestor = ancestor;
    this.descendant = descendant;
    this.depth = depth;
  }
}
