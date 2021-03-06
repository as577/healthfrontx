import React from 'react';
import ReactHighcharts from "react-highcharts";

export default class LineChart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			config: {
				title: {
					text: ""
				},
				colors: ['#8085e9', '#FF9800', '#9CCC65', '#29B6F6', '#E91E63', '#FFEB3B', '#26A69A', '#FF5722', '#388E3C', '#0277BD', '#F06292', '#7B1FA2', '#FFD54F', '#8D6E63'],
				xAxis: {
					categories: []
				},
				series: []
			},
			series: []
		};
		for(var i = 0; i < this.props.data.length; i++) {
		    var report = this.props.data[i];
				var date = new Date(report.time_collected);
				this.state.config.xAxis.categories.push(date.toDateString());
		}
		for(var i = 0; i < this.props.data.length; i++) {
				var report = this.props.data[i];
				for(var group in report.investigation) {
						if(String(group) === this.props.title) {
								for(var feature in report.investigation[String(group)][0]) {
										var contains = false;
										var entry = {};
										// var error = {};
										for(var j = 0; j < this.state.series.length; j++) {
												var ser = this.state.series[j];
												if(ser.name === String(feature)) {
														contains = true;
														entry = ser;
												}
												// if(ser.name === (String(feature) + " error")) {
												// 		error = ser;
												// }
										}
										if(contains) {
												entry.data.push(report.investigation[String(group)][0][String(feature)].value);
												// error.data.push([report.investigation[String(group)][0][String(feature)].min, report.investigation[String(group)][0][String(feature)].max])
										} else {
												entry = {
													name: String(feature),
													data: [report.investigation[String(group)][0][String(feature)].value]
												}
												// error = {
												// 	name: (String(feature) + " error"),
												// 	type: 'errorbar',
												// 	data: [[report.investigation[String(group)][0][String(feature)].min, report.investigation[String(group)][0][String(feature)].max]]
												// }
												this.state.series.push(entry);
												// this.state.series.push(error);
										}
								}
						}
				}
		}
	}

  render() {
		for(var i = 0; i < this.state.series.length; i++) { 	// += 2
				var entry = this.state.series[i];
				// var error = this.state.series[i+1];
				var index = -1;
				for(var j = 0; j < this.state.config.series.length; j++) {	// += 2
						var configEntry = this.state.config.series[j];
						if(configEntry.name === String(entry.name)) {
								index = j;
						}
				}
				if(this.props.features.indexOf(String(entry.name)) == -1) {	// if not found in features, remove it from config if its there
						if(index != -1) {
								this.state.config.series.splice(index, 1);	// splice 2
						}
				} else {
						if(index == -1) {																				 // if it is in features and not in config, add it to config
								this.state.config.series.push(entry);
								// this.state.config.series.push(error);
						}
				}
		}
    return (
      <div className="row">
        <br/>
        <div className="col-md-11">
          <ReactHighcharts config={this.state.config}></ReactHighcharts>
        </div>
      </div>
    )
  }

}
