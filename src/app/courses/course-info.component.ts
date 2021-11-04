import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "./course";

import { CourseService } from "./course.service";

@Component({
    templateUrl: "./course-info.component.html"
})
export class CourseInfoComponent implements OnInit{

    course: Course = {
        id: 0,
        name: "",
        imageUrl: "",
        price: 0,
        code: "",
        duration: 0,
        rating: 0,
        releaseDate: "",
        description: ""
    };

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService){

    }

    ngOnInit(): void {
       this.courseService.retrieveById(Number(this.activatedRoute.snapshot.paramMap.get("id"))).subscribe({
           next: courseR => this.course = courseR,
           error: err => alert("Erro : "+err)
       });
    }

    save(): void {
        this.courseService.save(this.course).subscribe({
            next: course => alert("Curso "+course.name+" salvo com sucesso"),
            error: err => alert("Erro : "+err)
        });
    }

}