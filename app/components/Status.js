import React from 'react';
import Title from './Title';

export default class Status extends React.Component {

	render() {
    	return (
      		<div className='content'>
						<Title title="Status" subtitle="A quick overview." />
						<div className="row">
							<div className="col-md-6">
								<h1>Hello</h1>
							</div>
							<div className="col-md-6">
								<h1>World</h1>
							</div>
						</div>
      		</div>
    	);
  	}
}
