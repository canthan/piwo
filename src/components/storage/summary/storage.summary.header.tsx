import * as React from 'react';
import * as ReactDOM from 'react-dom';

function StorageSummaryHeader(props) {
  const headers = [
    'Storage name',
    'Overall litres',
    '0,5 bottle litres',
    'Small bottles',
    '0,5 bottles',
    'Crates overall',
    'Crates empty',
    'Crates full',
  ];
  return (
    <div className='container summary'>
      <ul className='col-3 col-md-12 summary__list justify-content-around'>
        {headers.map((header, index) => {
          return <li className='col-12 col-md-1' key={index}>{header}</li>;
        })}
      </ul>
    </div>
  );
}

export default StorageSummaryHeader;
