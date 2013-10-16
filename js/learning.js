// Load the Visualization API and the piechart package.
google.load('visualization', '1', {'packages':['corechart','table','imagechart']});
var grades = ['Z','L','W','S','P'];
var grade_labels = {'Z':'Zero','L':'Letter','W':'Word','S':'Sentence','P':'Paragraph'};

function initialise()
{
  reading_2011 = {
	'2':[5.87,20.54,27.69,22.76,23.13],
	'3':[2.67,10.82,22.85,22.47,41.19],
	'4':[1.68,5.07,14.92,24.56,53.77],
	'5':[1.43,3.49,9.28,24.13,61.66],
	'6':[0.51,2.54,6.87,25.50,64.58],
	'7':[0.44,1.46,4.73,21.60,71.77]
        };
  sch_assess_chart(reading_2011,'reading2011_gph','Library Reading 2011');
  reading_2006_base = {
	/*'2':[17.64,34.51,25.76,15.91,6.18],
	'3':[12.61,25.01,25.37,19.94,17.07],
	'4':[8.98,16.74,23.08,23.70,27.51],
	'5':[7.80,13.00,19.87,22.50,36.83],
	'6':[4.97,10.72,18.94,20.71,44.65],
	'7':[3.53,7.42,15.10,18.62,55.33]
	//'8':[3.71,10.83,18.82,16.39,50.26]*/
        '2':[22.66,43.90,33.44,0.00,0.00],
	'3':[19.86,39.17,40.97,0.00,0.00],
	'4':[19.22,33.26,47.52,0.00,0.00],
	'5':[18.78,33.14,48.09,0.00,0.00],
	'6':[14.89,31.21,53.90,0.00,0.00],
	'7':[14.23,29.18,56.59,0.00,0.00]
	//'8':[10.78,31.19,58.03,0.00,0.00]
        };
  sch_assess_chart(reading_2006_base,'reading2006_base_gph','Baseline Reading 2006');
  reading_2006_end = {
	/*'2':[1.95,11.67,31.13,37.13,18.13],
	'3':[1.88,8.32,27.27,40.62,21.90],
	'4':[2.38,7.09,24.48,40.67,25.38],
	'5':[1.55,4.57,21.45,40.76,31.67],
	'6':[1.23,5.78,17.51,42.18,33.30],
	'7':[1.56,4.40,19.44,38.37,36.23]
	//'8':[2.44,4.16,18.09,44.01,31.30]*/
        '2':[1.96,11.70,31.11,37.12,18.12],
	'3':[1.89,8.23,27.39,40.68,21.81],
	'4':[2.35,7.23,24.32,40.86,25.24],
	'5':[1.57,4.59,21.31,40.79,31.73],
	'6':[1.14,5.82,17.30,42.22,33.51],
	'7':[1.48,4.45,19.71,38.30,36.05]
	//'8':[2.04,3.83,17.86,44.13,32.14]
        };
  sch_assess_chart(reading_2006_end,'reading2006_end_gph','End Reading 2006');
}

function sch_assess_chart(hashdata,htmlgph,titlegph)
{
      var data = new google.visualization.DataTable();
      data.addColumn('string' , 'Class');
      for (var i in grades) {
          data.addColumn('number', grade_labels[grades[i]]);
      }
      for (var key in hashdata){
        row = ['Class ' + key]
        data.addRow(row.concat(roundPerc(hashdata[key],100)));
      }
      var chart1 = new google.visualization.BarChart(document.getElementById(htmlgph));
      chart1.draw(data, {width: 750, height: 250, chartArea:{width:'70%'},  title: titlegph,colors:['E6550D','FDAE6B','FFEDA0','ADDD8E','31A354'], isStacked:true});
}

function roundPerc(l, target) {
    var off = target - _.reduce(l, function(acc, x) { return acc + Math.round(x) }, 0);
    return _.chain(l).
            //sortBy(function(x) { return Math.round(x) - x }).
            map(function(x, i) { return Math.round(x) + (off > i) - (i >= (l.length + off)) }).
            value();
}
