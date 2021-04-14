import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CustomPagination = (props) => {
  const { limit, pages, currentPage, PaginationHandleClick } = props;

  let arr = [];
  if (pages <= 5) {
    for (let i = 0; i < pages; i++) {
      arr.push({
        offSet: i * limit,
        page: i + 1,
      });
    }
  } else if (pages >= 5 && currentPage <= 4) {
    for (let i = 0; i <= 4; i++) {
      arr.push({
        offSet: i * limit,
        page: i + 1,
      });
    }

    arr.push({
      offSet: '...',
      page: '...',
    });

    arr.push({
      offSet: (pages - 1) * limit,
      page: pages,
    });
  } else if (pages >= 5 && currentPage >= 5 && currentPage <= pages - 4) {
    arr.push({
      offSet: 0,
      page: 1,
    });

    arr.push({
      offSet: '...',
      page: '...',
    });

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      arr.push({
        offSet: (i - 1) * limit,
        page: i,
      });
    }

    arr.push({
      offSet: '...',
      page: '...',
    });

    arr.push({
      offSet: (pages - 1) * limit,
      page: pages,
    });
  } else {
    arr.push({
      offSet: 0,
      page: 1,
    });

    arr.push({
      offSet: '...',
      page: '...',
    });

    for (let i = pages - 4; i <= pages; i++) {
      arr.push({
        offSet: (i - 1) * limit,
        page: i,
      });
    }
  }

  return (
    <Pagination aria-label='Page navigation example'>
      <PaginationItem disabled>
        <PaginationLink>
          <i className='mdi mdi-chevron-left'></i>
        </PaginationLink>
      </PaginationItem>

      {arr.map((item, i) => {
        return item.page === currentPage ? (
          <PaginationItem active key={i}>
            <PaginationLink
              disabled={item.page === '...'}
              onClick={() => PaginationHandleClick(item.offSet, item.page)}
            >
              {item.page}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={i}>
            <PaginationLink
              disabled={item.page === '...'}
              onClick={() => PaginationHandleClick(item.offSet, item.page)}
            >
              {item.page}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationLink href='#'>
          <i className='mdi mdi-chevron-right'></i>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
