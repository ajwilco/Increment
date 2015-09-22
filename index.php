<!DOCTYPE html>
<html>
	<head>
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="HandheldFriendly" content="true" />
		
		<style type="text/css">
			button{
				margin		: .75em;
				padding		: .75em;
			}
		</style>
	</head>
	<body>
		<p>Hey.  My name is Aaron.  This is a thing.</p>
		<p>If you so feel the need, click a button.</p>
		
		<label id="label0" for="button0"></label>
		<div style="text-align:center;"><button style="font-size:1.5em;width:70%;" id="button0" onclick="click0()">Click this.</button></div>
		
		<table>
			<tr><td style="width:100px">CPS:</td><td><label id="cps">0</label></td></tr>
			<?php
				for($i=1; $i<12; $i++){
Print <<< END
					<tr>
						<td><label id="label{$i}" for="button{$i}"></label></td>
						<td><button id="button{$i}" disabled="true"></button></td>
					</tr>
END;
				}
			?>
		</table>
		<script type="text/javascript" src="stuff.js"></script>
	</body>
</html>