import { PaginationDTO, SortDTO } from '../common/requests/query-all.dto';

export class DatabaseUtils {
  static getPaginationArgs({ page = 0, pageSize }: PaginationDTO) {
    page = +page;
    pageSize = +pageSize;
    if (!pageSize) return;
    if (page === 0) {
      return {
        skip: 0,
        take: pageSize * 2,
      };
    }
    return {
      skip: (page - 1) * pageSize,
      take: pageSize * 3,
    };
  }

  static convertPaginationData(
    result: any,
    totalAmount: number,
    { page, pageSize }: PaginationDTO,
  ) {
    page = +page;
    pageSize = +pageSize;

    const pages = Math.ceil(result.length / pageSize);
    const totalPages = Math.ceil(totalAmount / pageSize);

    if (!pageSize || pages === 1) {
      return {
        data: result,
        meta: {
          amount: result.length,
          totalAmount,
          totalPages,
          pageSize: +pageSize,
          page: +page,
          prevPageSize: 0,
          nextPageSize: 0,
        },
      };
    }
    if (page === 0) {
      const data = result.slice(0, pageSize);
      return {
        data,
        meta: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageSize: 0,
          nextPageSize: data.slice(pageSize).length,
        },
      };
    } else if (pages === 2) {
      const data = result.slice(pageSize);
      return {
        data,
        meta: {
          amount: data.length,
          totalAmount,
          totalPages,
          pageSize,
          page,
          prevPageSize: data.slice(0, pageSize).length,
          nextPageSize: 0,
        },
      };
    }
    const data = result.slice(pageSize, pageSize * 2);
    return {
      data,
      meta: {
        amount: data.length,
        totalAmount,
        totalPages,
        pageSize,
        page,
        prevPageSize: data.slice(0, pageSize).length,
        nextPageSize: data.slice(pageSize * 2).length,
      },
    };
  }

  static getSortArgs({ sort, order = 'asc' }: SortDTO, standardField: string) {
    if (!sort)
      return {
        orderBy: [
          {
            [standardField]: order,
          },
        ],
      };
    return {
      orderBy: [
        {
          [sort]: order,
        },
      ],
    };
  }
}
