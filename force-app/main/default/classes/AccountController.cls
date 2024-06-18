public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer limitSize, Integer offset){
       List<Account> accounts = [SELECT Id, Name FROM Account ORDER BY CreatedDate LIMIT :limitSize OFFSET :offset ];
       return accounts;
    }

    public static void addMultipleAccounts(Integer noOfAccounts){

        List<Account> accounts = new List<Account>();

        for(Integer i=0; i<noOfAccounts; i++){
            accounts.add(new Account(Name='Account '+i));
        }

        insert accounts;
    }
}