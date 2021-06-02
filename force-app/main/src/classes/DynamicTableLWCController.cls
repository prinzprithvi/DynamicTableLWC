public class DynamicTableLWCController {
    @AuraEnabled(cacheable=true)
    public static DynamicBindingWrapper getRecords(List<String> fieldAPIs, String sObjectType, String filter,String replaceHeaders){
        System.debug('--->'+fieldAPIs);
        DynamicBindingWrapper dynamicData = new DynamicBindingWrapper();
        List<FieldDataWrapper> wrapperList =  new List<FieldDataWrapper>();

        SObjectType sObjectName = Schema.getGlobalDescribe().get(sObjectType);
        Map<String,Schema.SObjectField> mfields = sObjectName.getDescribe().fields.getMap();
        
        Map<String,String> headerTokens = new Map<String,String>();
        for(String token : replaceHeaders.split(',')){
            String[] keyValues = token.split(':');
            if(keyValues.size() > 1)
                //wrapperList.add(new FieldDataWrapper(keyValues[1],keyValues[0],'TEXT'));
                headerTokens.put(keyValues[0],keyValues[1]);
        }
        for(String field : fieldAPIs){
            if(headerTokens.containsKey(field))
                wrapperList.add(new FieldDataWrapper(headerTokens.get(field),field,'TEXT'));
        	else if(mfields.containsKey(field))
        		wrapperList.add(new FieldDataWrapper(mfields.get(field).getDescribe().getLabel(),field,String.valueOf(mfields.get(field).getDescribe().getType())));
        }
        
        String fields = String.join(fieldAPIs,',');
        dynamicData.sObjectData = Database.query('SELECT '+fields+' FROM '+sObjectType+' LIMIT 10');//WHERE Name LIKE \'%'+filter+'%\'
    	dynamicData.fieldList = wrapperList;

    	return dynamicData;
    }


    /* Class to store the dynamic data 
     * and list of related fields
     */ 
    public class DynamicBindingWrapper{
        @AuraEnabled
        public List<SObject> sObjectData    { get; set; }
        @AuraEnabled
        public List<FieldDataWrapper> fieldList { get; set; }
    }
    /*
     * Class to store the field information
     */ 
    public class FieldDataWrapper{
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String apiName { get; set; }
        @AuraEnabled
        public String dataType {get;set;}
        public FieldDataWrapper(String label, String apiName, String dataType){
        	this.label = label;
        	this.apiName = apiName;
        	this.dataType = dataType;
        }
    }
}