import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';

/**
*
  const handleChange = (page) => {
    getPostList(page);
  };

  <Pagination
    className={''}
    meta={stateData?.meta}
    callback={handleChange}
    />

*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function MyPagination(props) {
  const { className, meta, callback, } = props;

  const pagination = useMemo(() => {
    if (meta) {
      const { currentPage, totalPages, itemCount } = meta;
      const prev = currentPage - 1;
      const prevPage = prev - 1;
      const next = currentPage + 1;
      const nextPage = next + 1;

      //화면에 보여질 페이지 숫자 리스트 구하기
      let showPages = [];
      const start = currentPage === totalPages ? currentPage-2 : currentPage-1;
      const end = currentPage === 1 ? currentPage+3 : currentPage+2;
      for( let i = start; i < end; i++ ){
        // 마이너스 제외, totalPages 보다 큰애들 제외
        if( i > 0 && i <= totalPages ){
          showPages.push(i);
        }
      }

      return (
        <>
          {/* Arrow left */}
          {prevPage > 0 && (
            <li
              className="prev"
              onClick={() => callback?.(prevPage)}
            >
              <div>
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
            </li>
          )}

          {/* page list */}
          {showPages &&
            showPages.map((page, index) => (
              <li
                key={`page_${index}`}
                className={`${page === currentPage ? "on" : ""}`}
                onClick={() => callback?.( page)}
              >
                <div>{page}</div>
              </li>
            ))}

          {/* Arrow right */}
          {itemCount > 0 && totalPages - nextPage > -1 && (
            <li
              className="next"
              onClick={() => callback?.( nextPage)}
            >
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </li>
          )}
        </>
      );
    } else {
      return <></>;
    }
  }, [meta]);

  return (
    <>
      <div className="pagenation">
        <ul>{pagination}</ul>
      </div>
    </>
  )
}
