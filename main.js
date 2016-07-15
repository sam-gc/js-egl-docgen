var marked = require('marked'),
    fs     = require('fs'),
    ejs    = require('ejs'),
    path   = require('path'),
    hl     = require('highlight.js');

String.prototype.firstToUpper = function() {
    var exp = this.split('');
    return exp[0].toUpperCase() + exp.splice(1).join('');
};

String.prototype.titlize = function(delim) {
    var exemptions = [
        'for', 'the', 'on', 'of', 'a', 'is'
    ];

    var parts = this.split(delim);
    var newParts = [];

    newParts.push(parts[0].firstToUpper());
    parts.splice(1).forEach(function(p) {
        newParts.push(exemptions.includes(p) ?
                p : p.firstToUpper()
        );
    });

    return newParts.join(' ');
};

hl.registerLanguage('eagle', require('./eagle.js'));
marked.setOptions({
    highlight: function(code, lang) {
        if(!lang) lang = 'eagle';
        return hl.highlight(lang, code, true).value;
    }
});

var args = process.argv.slice(2);
if(args.length == 0) {
    console.error('Missing directory name');
}

var dir = args[0];

function generate(layout, output) {
    var index = createIndex(layout.listing);

    prepare(output);
    var chap = '';
    var chapRender = '';

    index.forEach(function(item, i) {
        if(item.cname != '') {
            chap = item.cname;
            chapRender = item.name;
        }

        var fname = path.join(layout.dir, chap, item.md);
        var oname = path.join(output, item.path);
        var gen = marked(fs.readFileSync(fname, 'utf8'));
        ejs.renderFile('html/template.ejs', {
            render: gen,
            index: index,
            si: i,
            chapter: chapRender
        }, null, function(err, str) {
            if(err)
                die(err);
            fs.writeFile(oname, str);
        });
    });
}

/*
function generate(input, output) {
    var infoFile = path.join(input, 'layout.json');
    var work = JSON.parse(fs.readFileSync(infoFile));
    var names = createTitles(work);
    
    prepare(output);
    
    work.forEach(function(md) {
        var fname = path.join(input, md);
        var oname = path.join(output, path.basename(md, '.md') + '.html');
        var gen = marked(fs.readFileSync(fname, 'utf8'));
        ejs.renderFile('html/template.ejs', {render: gen, index: names}, null, function(err, str) {
            fs.writeFile(oname, str);
        });
    });
}
*/

// generate(dir, 'output');

function scan(input) {
    var list = [];

    files = fs.readdirSync(input);
    var infoFile = path.join(input, 'layout.json');
    var listing = JSON.parse(fs.readFileSync(infoFile));
    
    listing.forEach(function(item) {
        var fname = path.join(input, item);
        if(!isDirectory(fname)) {
            list.push(item);
            return;
        }

        var chapter = {
            name: item,
            // files: scan(fname)
        };

        var cfiles = scan(fname).listing;

        list.push(chapter);
        list.push.apply(list, cfiles);
    });

    return {
        dir: input,
        listing: list
    }
}

generate(scan(dir), 'output');

function die(err) {
    console.error('Error: ' + err);
    process.exit();
}

function prepare(name) {
    fs.mkdirSync(name);
}

function isDirectory(name) {
    return fs.lstatSync(name).isDirectory();
}

function createTitle(name) {
    return {
        name: name.split('.md')[0].titlize('-'),
        path: path.basename(name, '.md') + '.html'
    };
}

/*
function createTitles(names) {
    var out = [];
    names.forEach(function(name) {
        var obj = {
            name: name.split('.md')[0].titlize('-'),
            path: path.basename(name, '.md') + '.html'
        };
        out.push(obj);
    });

    return out;
}
*/

function createIndex(layout) {
    var out = [];
    var ccount = 0;
    var count = 0;
    layout.forEach(function(item) {
        var name;
        var md;
        var cname = '';

        if((typeof item) == 'string') { // We are dealing with just a section
            md = item;
            name = item.split('.md')[0].titlize('-');
            count += 1;
        }
        else {
            md = 'head.md';
            cname = item.name;
            name = item.name.titlize('-');
            ccount += 1;
            count = 0;
        }

        var sec  = ccount + '.' + count;

        out.push({
            name: name,
            sec: sec,
            path: sec + '.html',
            md: md,
            cname: cname
        });
    });

    return out;
}

function Chapter(name, files) {
    this.name = name;
    this.files = files;
}

Chapter.prototype.toString = function() {
    return this.name;
};

