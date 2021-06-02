# DynamicTable

DynamicTable which works with any salesforce SObject.
Field configuration will support SOQL upto one-level parent field.

Configure following attributes:

1) fieldAPI's
2) objectAPI
3) replaceHeaders and you are all set to go.

#JS

All column's are readonly; First column is linked to "Done" event, which is fired on selection of a record. It will pass the record details so that parent component can handle and use the event data for further processing.

Usage,
From a parent component add DynamicTable as a child component and pass configuring attributes, as shown below.
	
	<c-dynamic-table fieldapis={fieldapis} objname={objname} replaceheaders={replaceheaders}></c-dynamic-table>
	
	
Fork's are welcome.

Happy Coding :)