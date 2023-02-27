import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationBar = ({pageCount, setPage}) => {
    const handelOnchange = (e ,p) => { 
        setPage(p)
    }
  return (
    <Stack  spacing={2}>
      <Pagination sx={{
        padding:"5px" ,
      }} count={pageCount} onChange={handelOnchange}  shape="rounded" />
    </Stack>
  );
}
export default PaginationBar