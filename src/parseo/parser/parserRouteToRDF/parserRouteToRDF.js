
class ParserRouteToRDFClass {
    
    parse = route => {
        this.rdf="";
      /*prefix viade:  <http://arquisoft.github.io/viadeSpec/>
        prefix :       <http://example.org/>
        prefix schema: <http://schema.org/>
        prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
        prefix xsd:    <http://www.w3.org/2001/XMLSchema#>
        */ 
       this.rdf="@prefix viade: <http://arquisoft.github.io/viadeSpec/>. " ;
       this.rdf+="@prefix : <http://example.org/>. ";
       this.rdf+="@prefix schema: <http://schema.org/>. ";
       this.rdf+="@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>. ";
       this.rdf+="@prefix xsd:    <http://www.w3.org/2001/XMLSchema#>. ";
       /*

       :myRoute a viade:Route ;
       schema:name "My first route" ;
       schema:description "This is an example of route" ;
       viade:point [ 
        schema:latitude 47.64458 ; 
        schema:longitude -122.326897 ; 
        viade:order 1 
       ] ;
       viade:point [ 
        schema:latitude 47.644532; 
        schema:longitude -123.3345 ; 
        viade:order 2; 
        schema:elevation 34 
       ]; 
       viade:hasComments "I really enjoyed this route" ;
       viade:hasMediaAttached :media1 .
      
      :media1 schema:contentUrl <http://example.org/picture.jpg> ;
              schema:publishedDate "2020-03-26T21:32:52"^^xsd:dateTime ;
              schema:author <https://labra.solid.community/profile/card#me> .
              
        */
       this.rdf+=":myRoute a viade:Route ;";
       this.rdf+='schema:name "'+route.name+'" ;';
       if (route.description!==""){
        this.rdf+= 'schema:description "'+route.description+'" ;';
       }
       

       for (var i=0;i<route.points.length;i++){
            this.rdf+="viade:point [";
            this.rdf+='schema:latitude '+route.points[i].latitud+' ;';
            this.rdf+='schema:longitude '+route.points[i].longitud+' ;';
            if (route.points[i].elevacion===""){
                this.rdf+='viade:order '+route.points[i].order;
            }else{
                this.rdf+='viade:order '+route.points[i].order+' ;';
                this.rdf+='schema:elevation '+route.points[i].elevacion;
            }
            if (i===route.points.length-1){
              this.rdf+="] .";
            }else{
              this.rdf+="] ;";
            }
           
            
       }
       
       return this.rdf.toString();
    };
    
  }
  const ParserRouteToRDF = new ParserRouteToRDFClass();

  export {ParserRouteToRDF};