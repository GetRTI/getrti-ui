module.exports = function(app){

    app.get('/files', function(req, res){

        var files = [{"id": "123343434", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "3452435", "name":"File 2","date":"01/03/2013","status":"Pending","tags":["bus","train"],"department":"Transport"},
            {"id": "238482", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"},
            {"id": "23453425", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"},
            {"id": "23452345", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "1223453", "name":"File 2","date":"01/03/2013","status":"Pending","tags":["bus","train"],"department":"Transport"},
            {"id": "123094", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"},
            {"id": "1786978923", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"},
            {"id": "17897897823", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "89789", "name":"File 2","date":"01/03/2013","status":"Published","tags":["bus","train"],"department":"Transport"},
            {"id": "12893", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"},
            {"id": "127893", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"},
            {"id": "124563", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "167623", "name":"File 2","date":"01/03/2013","status":"Pending","tags":["bus","train"],"department":"Transport"},
            {"id": "16723", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"},
            {"id": "1234573", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"},
            {"id": "12865233", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "912367123", "name":"File 2","date":"01/03/2013","status":"Pending","tags":["bus","train"],"department":"Transport"},
            {"id": "2834123", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"},
            {"id": "1129323", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"}];
        
        res.json(files);

    });

    // Should do a text search of the content,
    // results should have 
    // {name, category, date, relevance}
    // 
    // For example files which contains the text in file name
    // taks more precedence over other files where the query
    // matches in the text blob
    app.get('/search/:query', function(req, res){
        var query = req.param('query');

        var files = [{"id": "123343434", "name":"File 1","date":"12/23/2013","status":"Published","tags":["education","studies"],"department":"education"},
            {"id": "3452435", "name":"File 2","date":"01/03/2013","status":"Pending","tags":["bus","train"],"department":"Transport"},
            {"id": "238482", "name":"File 3","date":"02/24/2012","status":"Published","tags":["water","sewage"],"department":"water"}];

        res.json(files);
    });

    // Will return the detailed information of each file
    // Should return the images and the pages along with normal details
    app.get('/file/:fileId', function(req, res){

        var file = {"id": "1129323", "name":"File 4","date":"10/04/2013","status":"Pending","tags":["agriculture","field"],"department":"agri"};
        file['content'] = [ 
            {'image': 'images/image1.jpg', 'text': 'Contents of first image1'}, 
            {'image': 'images/image2.jpg', 'text': 'Contents of second image2'}, 
            {'image': 'images/image3.jpg', 'text': 'Contents of thid image3'}, 
            {'image': 'images/image4.jpg', 'text': 'Contents of fourth image4'}
        ];
        res.json(file);
    });

    // 
    // Save the details of the file once submitted..
    // 
    app.post('/file/:fileId', function(req, res){
        var tags = req.param('tags');
        var department = req.param('department');
        var pages = req.param('pages');

        res.json({"status": "UPDATED"});
    });

    // 
    // Uploads the new files
    // Should support handling multiple files
    // 
    app.put('/file', function(req, res){

        if (req.files){
            console.log(req.files);
        }
        // Will have all the values except tags and departments
        var files = [
         {"id": "123445", "name": "file 4", "date": new Date(), "status": "pending", "tags": [], "department": ""},
         {"id": "437777", "name": "file 5", "date": new Date(), "status": "pending", "tags": [], "department": ""},
        ];

        res.json(files);
    });

    app.del('file/:fileId', function(req,res){
        var fileId = req.param('fileId');
        
        //Delete the file with the fileId
        res.json({"status": "DELETED"});
    });
};
