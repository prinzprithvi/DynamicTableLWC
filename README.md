# DynamicTableLWC

dynamicTableLWC which works with any salesforce SObject and field configuration along with one level of parent field configuration

Configure fieldAPI's, ObjectAPI and replaceHeaders attributes, and you are all set to go.

#JS

All column data are readonly; First column is linked to "Done" event, which is fired on selection of record, it will pass the record details so that parent component can handle and use the event data for further processing.

Usage,
From a parent component add dynamicTableLWC as a child component and pass configuring attributes, as shown below.
	
	<c-dynamic-table fieldapis={fieldapis} objname={objname} replaceheaders={replaceheaders}></c-dynamic-table>
	
	
fork's are welcome

Happy Coding :)