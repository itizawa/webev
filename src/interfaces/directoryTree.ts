export class DirectoryTree {
  _id: string;
  ancestor: string;
  descendant: string;
  depth: number;
  constructor({ _id, ancestor, descendant, depth }: DirectoryTree) {
    this._id = _id;
    this.ancestor = ancestor;
    this.descendant = descendant;
    this.depth = depth;
  }
}
