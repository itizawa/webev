import * as cheerio from 'cheerio';
import { Cheerio } from 'cheerio';
import { PageForImport, DirForImport } from '~/interfaces/importBookmark';

// ブラウザからエクスポートしたブックマークhtmlの内容をスクレイピング
// ディレクトリとファイルの階層構造を以下のような Object の配列で再現
// dirs: {id, name, childrenDirIds: string[], childrenPages: {url, title}[]}[]
// dirs の各要素は一つのディレクトリを示し、以下の key をもつ
// - id: 識別子
// - name: ディレクトリ名
// - childrenDirIds: 子ディレクトリ識別子の配列
// - childrenPages: 子ページオブジェクトの配列
//
// ex.
// インポートするブックマークの階層構造
// - (Root Dir)Bookmarks
//   - (Page)[example](http://example.com)
//   - (Dir)hoge
//     - (page)[hogefuga])http://hogefuga.com)
// 出力結果
// [
//  {id: '', name: '', childrenDirIds: ['1591786320hoge'], childrenPage: [{url: 'http://example.com', title: 'example'}] },
//  {id: '1591786320hoge', name: 'hoge', childrenDirIds: [], childrenPage: [{url: 'http://hogefuga.com', title: 'hogefuga'}] },
// ]
export const convertFromHtmlToDirs = (html: string): DirForImport[] => {
  const root = cheerio.load(html);
  const result: DirForImport[] = [];

  // ディレクトリを表す要素を一件一件見ていく
  root('dl').map((_: number, nodeDL: Cheerio.Element): void => {
    const dir: DirForImport = {
      id: '',
      name: '',
      childrenDirIds: [],
      childrenPages: [],
    };

    // id と name の取得
    // 同名ディレクトリ区別のため、ディレクトリ作成日+ディレクトリ名を id として設定（safari には ADD_DATE がないため、同名ディレクトリは区別できない）
    // ディレクトリ作成日とディレクトリ名は同階層の二つ上の要素にあるため、nodeDL.previousSibling.previousSibling を取得
    const previousNode = cheerio.load(nodeDL.previousSibling.previousSibling);
    const dirCreateAt = previousNode('h3').attr('add_date') || '';
    const dirName = previousNode('h3').text() || '';
    dir.id = dirCreateAt + dirName;
    dir.name = dirName;

    // 子要素から配下ディレクトリと配下ページを取得
    nodeDL.childNodes.forEach((node: Cheerio.Element) => {
      const $ = cheerio.load(node);

      // 配下ページ
      const childPage = $('a');
      if (childPage.length > 0) {
        const page: PageForImport = { url: '', title: '' };
        page.url = childPage.attr('href') || '';
        page.title = childPage.text();
        dir.childrenPages.push(page);
      }

      // // 配下ディレクトリ
      const childDir = $('h3');
      if (childDir.length > 0) {
        const childDirCreateAt = childDir.attr('add_date');
        const childDirName = childDir.text();
        dir.childrenDirIds.push(childDirCreateAt + childDirName);
      }
    });

    result.push(dir);
  });

  return result;
};

export const convertFromHtmlToPageUrls = (html: string): string[] => {
  const root = cheerio.load(html);
  const result: string[] = [];

  root('a').map((_: number, node: Cheerio.Element): void => {
    result.push(node.attribs.href);
  });

  return result;
};

export const convertFromHtmlToPages = (html: string): PageForImport[] => {
  const root = cheerio.load(html);
  const result: PageForImport[] = [];

  root('a').map((_: number, node: Cheerio.Element): void => {
    const $ = cheerio.load(node);
    const url = $('a').attr('href') || '';
    const title = $('a').text();
    result.push({ url, title });
  });

  return result;
};
