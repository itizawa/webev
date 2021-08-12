import * as cheerio from 'cheerio';

// ディレクトリとファイルの階層構造を Object で再現
// dirs: {id, name, childrenDirIds: string[], childrenPages: {url, title}[]}[]
// ex.
// - Bookmarks(root dir)
//   - [example](http://example.com)
//   - hoge(dir)
//     - [hogefuga])http://hogefuga.com)
// >>>
// [
//  {id: '', name: 'Bookmarks', childrenDirIds: ['1'], childrenPage: [{url: 'http://example.com', title: 'example'}] },
//  {id: '1', name: 'hoge', childrenDirIds: [], childrenPage: [{url: 'http://hogefuga.com', title: 'hogefuga'}] },
// ]
export const convertToObjFromHtml = (html: string): any => {
  const root = cheerio.load(html);
  const res = [];

  root('dl').map((_: number, nodeDL: cheerio.Element): any => {
    const dir = { id: '', name: '', childrenDirIds: [], childrenPages: [] };

    // 同名ディレクトリ区別のため、作成日+ディレクトリ名を id として設定（safari には ADD_DATE がないため、同名ディレクトリは区別できない）
    // 一個上のエレメントのfirstchild をcheerio化
    const previousNode = cheerio.load(nodeDL.previousSibling.previousSibling);
    const dirCreateAt = previousNode('h3').attr('add_date') || '';
    const dirName = previousNode('h3').text() || '';
    dir.id = dirCreateAt + dirName;
    dir.name = dirName;

    // 子要素から配下ディレクトリと配下ページを取得
    nodeDL.childNodes.forEach((node: Node) => {
      if (node.name == 'dt') {
        const child = node.firstChild;
        if (child.name == 'a') {
          // 配下ページ
          const page: { url: string; title: string } = { url: '', title: '' };
          page.url = child.attribs.href;
          page.title = child.children[0].data;
          dir.childrenPages.push(page);
        } else if (child.name == 'h3') {
          // 配下ディレクトリ
          const childDirCreateAt = child.attribs?.add_date || '';
          const childDirName = child.children[0].data || '';
          dir.childrenDirIds.push(childDirCreateAt + childDirName);
        }
      }
    });

    res.push(dir);
  });

  return res;
};
