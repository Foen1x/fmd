<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
String path = request.getContextPath();
String lang = "zh";
%>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>Bar Chart</title>
    


<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2html.js"></script>
<script src="<%=path%>/js/3rdpartyother/jquery.json2html.js"></script>
<script src="<%=path%>/skins/bootstrap-blue/js/bootstrap.min.js"></script>

<link rel="StyleSheet" href="./helper.css" type="text/css"/>
    
</head>
<body>

	<h2>Bar Chart Example</h2>
	
	<!-- Location of the Chart -->
	<div id="chart"></div>

    <!-- Load JSON2HTML -->
    <script type="text/javascript">

		//Transforms

        var transforms = {
	        
			'barChart': [
		        
					{"tag":"ul","class":"barChart", "children":function() {return(json2html.transform(this.groups,transforms.barChartGroup));}}

	        ],
			'barChartGroup': [
		       
					{"tag":"li","class":"group","children":[
						{"tag":"div","class":"bar","style":'height:${value}px;'},
						{"tag":"div","class":"label","html":"${label}"}
					]}
	       
			]};
    	

    	 //Callback Function
         function getBarChart(json)

		 {
	        
			if(json !== undefined )

                {
                alert(json2html.transform(json, transforms.barChart));
				$('#chart').json2html(json, transforms.barChart);
                }

		}



        var transform1 = [{'tag':'li','html':'<a href="${href}" data-toggle="tab">${text}</a>'}];
     	var data1 = [
     	    {"href":"#tabbody_1","text":"FF"},
     	    {"href":"#tabbody_2","text":"FF"},
     	    {"href":"#tabbody_3","text":"FF"},
     	    {"href":"#tabbody_4","text":"FF"}
     	];
     	alert(json2html.transform(data1,transform1));
 		
    </script>

    <!-- Load Data Feed -->
    <script type="text/javascript">
        getBarChart({'groups':[{'value':10,'label':'Day 1'},{'value':5,'label':'Day 2'},{'value':15,'label':'Day 3'},{'value':4,'label':'Day 4'},{'value':5,'label':'Day 5'}]});
    </script>
</body>

</html>
