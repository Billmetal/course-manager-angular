import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./course";


@Injectable({
    providedIn: "root"
})
export class CourseService {

    /** Url do servidor criado localmente a partir dos arquivos colocados na pasta "assets/para-server".
     * Procedimento de instalação do server : (obs: ter o Node instalado no pc)
     * -copiar os arquivos da pasta "assets/para-server" em outra pasta fora das pastas deste projeto
     * -abrir o terminal no pc e ir até a pasta que vc criou com os arquivos
     * -digitar o comando "npm install" para instalar o server
     * -digitar "node serve.js" para iniciar o server
     * -para parar e fechar o server digitar "ctrl + c" 
    */
    private coursesUrl: string = "http://localhost:3100/api/courses";   

    constructor(private httpClient: HttpClient){}

    retrieveAll(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(this.coursesUrl);
    }

    retrieveById(id: number): Observable<Course> {
        return this.httpClient.get<Course>(`${this.coursesUrl}/${id}`);
    }

    save(course: Course): Observable<Course> {
        if(course.id){
            return this.httpClient.put<Course>(`${this.coursesUrl}/${course.id}`,course);
        } else {
            return this.httpClient.post<Course>(`${this.coursesUrl}`,course); 
        }
    }

    deleteById(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.coursesUrl}/${id}`);
    }
}