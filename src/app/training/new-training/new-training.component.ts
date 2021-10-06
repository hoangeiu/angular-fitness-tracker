import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;
  private loadingExercisesSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingExercisesSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoadingState) => (this.isLoading = isLoadingState)
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercise();
  }

  ngOnDestroy(): void {
    this.loadingExercisesSubs.unsubscribe();
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
