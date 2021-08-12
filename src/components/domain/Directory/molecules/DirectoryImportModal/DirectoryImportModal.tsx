import { VFC, useState } from 'react';

import * as cheerio from 'cheerio';
import { Modal } from '~/components/base/molecules/Modal';
import { useDirectoryForImport } from '~/stores/modal';

import { useLocale } from '~/hooks/useLocale';

export const DirectoryImportModal: VFC = () => {
  const { t } = useLocale();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  const { data: directoryForImport, mutate: mutateDirectoryForImport } = useDirectoryForImport();

  const importPages = async () => {
    const html: string = selectedFile != null ? await selectedFile.text() : '';
    const root = cheerio.load(html);
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

      return dir;
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files !== null ? e.target.files[0] : null);
    setIsSelected(true);
  };

  const closeImportModal = async () => {
    mutateDirectoryForImport(null);
  };

  return (
    <Modal isOpen={directoryForImport != null} toggle={closeImportModal} title={t.import}>
      <h5 className="mt-3 mb-5 text-center">
        <input type="file" accept="text/html" onChange={changeHandler} />
      </h5>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-secondary" onClick={closeImportModal}>
          {t.cancel}
        </button>
        <button className="btn btn-primary" onClick={importPages} disabled={!isSelected}>
          {t.import}
        </button>
      </div>
    </Modal>
  );
};
