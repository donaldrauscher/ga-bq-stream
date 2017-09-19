function RouteGAData(tracker) {

    ga(function(tracker) {
        var originalSendHitTask = tracker.get('sendHitTask');
        tracker.set('sendHitTask', function(model) {
            var payLoad = model.get('hitPayload');
            originalSendHitTask(model);
            var routeRequest = new XMLHttpRequest();
            var routePath = "https://REGION-PROJECT.cloudfunctions.net/ingestGA";
            routeRequest.open('GET', routePath + "?" + payLoad, true);
            routeRequest.send();
        });
    });

}
ga('provide', 'ga_route_plugin', RouteGAData);
