/**
 * The Mockup API for the Moccamaster.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 
angular.module('CoffeeApp.dev.mock.MoccamasterMock', [
    'ngMockE2E',
    'CoffeeApp.config',
    'CoffeeApp.dev.mock.MockService'
])

.run(['$httpBackend', 'config.apiBase', 'MockService', 
    function($httpBackend, apiBase, MockService) {
    
    /**
     * Dummy coffee machine
     */
    var moccamaster = {
        state : "Off",
        supplies: false
    };
    
    
    /**
     * Coffee machine interactions
     * ---------------------------
     */
     
     
    $httpBackend.whenGET(apiBase + 'coffeemachine/status/').respond(
        function (method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(moccamaster.state == "On") {
                moccamaster.timeleft = moccamaster.endtime - Math.floor(Date.now() / 1000);
            }
            return [200, moccamaster];
        }  
    );
    
    $httpBackend.whenPUT(apiBase + 'coffeemachine/start/').respond(
        function (method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(moccamaster.state == "Off") {
                moccamaster.state = "On";
                moccamaster.supplies = false;
                moccamaster.starttime = Math.floor(Date.now() / 1000);
                moccamaster.endtime = moccamaster.starttime + 300;
                moccamaster.timeleft = 300;
                return [200, moccamaster];
            }
        }
    );
    
    $httpBackend.whenPUT(apiBase + 'coffeemachine/stop/').respond(
        function (method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(moccamaster.state == "On") {
                moccamaster.state = "Off";
                delete moccamaster.starttime;
                delete moccamaster.endtime;
                delete moccamaster.timeleft;
                return [200, moccamaster];
            }
        }
    );
    
    $httpBackend.whenPUT(apiBase + 'coffeemachine/sethigh/').respond(
        function (method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            moccamaster.supplies = true;
            return [200, moccamaster];
        }
    );
    
    $httpBackend.whenPUT(apiBase + 'coffeemachine/setlow/').respond(
        function (method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            moccamaster.supplies = false;
            return [200, moccamaster];
        }
    );
    
}]);