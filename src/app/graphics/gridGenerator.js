var lineColor = new paper.Color(173/255, 216/255, 230/255);


//TODO: Fix fifth-line highlighting at low/high zooms!
class GridGenerator {

    static makeGrid(spacing){
        let vert = GridGenerator.makeVerticalGrid(spacing);
        let horiz = GridGenerator.makeHorizontalGrid(spacing);
        return new paper.Group([vert, horiz]);
    }

    static getTopLeft(){
        return paper.view.viewToProject(new paper.Point(0,0));
    }

    static getBottomLeft(){
        return paper.view.viewToProject(new paper.Point(0, paper.view.bounds.height * paper.view.zoom));
    }

    static getBottomRight(){
        return paper.view.viewToProject(new paper.Point(paper.view.bounds.width * paper.view.zoom, paper.view.bounds.height * paper.view.zoom));
    }

    static getTopRight(){
        return paper.view.viewToProject(new paper.Point(paper.view.bounds.width * paper.view.zoom, 0));
    }

    static makeVerticalGrid(spacing){
        let topLeft = GridGenerator.getTopLeft();
        let bottomRight = GridGenerator.getBottomRight();
        let height = bottomRight.y - topLeft.y;
        let vertGroup = new paper.Group();
        let sym = new paper.Symbol(GridGenerator.makeVerticalLineTemplate());
        let thick = new paper.Symbol(GridGenerator.makeThickVerticalLineTemplate());
        for (let i = Math.floor(topLeft.x / spacing) * spacing; i <= bottomRight.x; i += spacing){
            let pos = new paper.Point(i, topLeft.y + height/2);
            if (i% (spacing*5) < spacing && i % (spacing*5) > -spacing) vertGroup.addChild(thick.place(pos));
            else vertGroup.addChild(sym.place(pos));
        }
        for (let i = Math.floor(topLeft.x / spacing) * spacing; i >= topLeft.x; i -= spacing){
            let pos = new paper.Point(i, topLeft.y + height/2);
            if (i% (spacing*5) < spacing && i % (spacing*5) > -spacing) vertGroup.addChild(thick.place(pos));
            else vertGroup.addChild(sym.place(pos));
        }
        return vertGroup;
    }

    static makeHorizontalGrid(spacing){
        let topLeft = GridGenerator.getTopLeft();
        let bottomRight = GridGenerator.getBottomRight();
        let width = bottomRight.x - topLeft.x;
        let horizGroup = new paper.Group();
        let sym = new paper.Symbol(GridGenerator.makeHorizontalLineTemplate());
        let thick = new paper.Symbol(GridGenerator.makeThickHorizontalLineTemplate());
        for (let i = Math.floor(topLeft.y / spacing) * spacing; i < bottomRight.y; i += spacing){
            let pos = new paper.Point(topLeft.x + width/2, i);
            if (i% (spacing*5) < spacing && i % (spacing*5) > -spacing) horizGroup.addChild(thick.place(pos));
            else horizGroup.addChild(sym.place(pos));
        }
        for (let i = Math.floor(topLeft.y / spacing) * spacing; i >= topLeft.y; i -= spacing){
            let pos = new paper.Point(topLeft.x + width/2, i);
            if (i% (spacing*5) < spacing && i % (spacing*5) > -spacing) horizGroup.addChild(thick.place(pos));
            else horizGroup.addChild(sym.place(pos));
        }
        return horizGroup;
    }

    static makeVerticalLineTemplate(){
        return GridGenerator.gridLineTemplate(GridGenerator.getTopLeft(), GridGenerator.getBottomLeft());
    }

    static makeThickVerticalLineTemplate(){
        let line = GridGenerator.makeVerticalLineTemplate();
        line.strokeWidth = GridGenerator.getStrokeWidth() *3;
        return line;
    }

    static makeHorizontalLineTemplate(){
        return GridGenerator.gridLineTemplate(GridGenerator.getTopLeft(), GridGenerator.getTopRight());
    }

    static makeThickHorizontalLineTemplate(){
        let line = GridGenerator.makeHorizontalLineTemplate();
        line.strokeWidth = GridGenerator.getStrokeWidth() * 3;
        return line;
    }

    static gridLineTemplate(start, end){
        let line = paper.Path.Line(start, end);
        line.strokeColor = lineColor;
        line.strokeWidth = GridGenerator.getStrokeWidth();
        line.remove();
        line.guide = true;
        return line;
    }

    static getStrokeWidth(){
        let width = 1 / paper.view.zoom;
        return width; 
    }
}

module.exports = GridGenerator;