describe('Fixtures', function () {

    beforeEach(module('CrunchKata'));

    beforeEach('Get tools', inject(function ( _FixturesFactory_,_$httpBackend_) {
        Fixtures = _FixturesFactory_;
        $httpBackend = _$httpBackend_;
    }));

    it('should be an defined', function() {
        expect(Fixtures).to.be.defined;
    });

    it('should be an object', function() {
        expect(Fixtures).to.be.an('object');
    });

    describe('getOrder', function () {
        it('should make the expected request when called', function () {
            Fixtures.getOrder();
            $httpBackend.flush();
        });

        it('should return a promise that resolves to the data of the response', function (done) {
            MessagesFactory.getOrder().then(function (data) {
                expect(data).not.toBeUndefined();
                done();
            });
            $httpBackend.flush();
        });

    });

    describe('getVariables', function () {
        it('should make the expected request when called', function () {
            Fixtures.getVariables();
            $httpBackend.flush();
        });

        it('should return a promise that resolves to the data of the response', function (done) {
            MessagesFactory.getVariables().then(function (data) {
                expect(data).not.toBeUndefined();
                done();
            });
            $httpBackend.flush();
        });

    });

});