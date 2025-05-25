import { Injectable } from '@angular/core';
import {IndividualConfig, ToastContainerDirective, ToastrService} from "ngx-toastr";

const TOASTR_CONFIG = {
  positionClass: 'toast-top-center',
  easeTime: 1000,
  timeOut: 5000,
  progressBar: true
};

@Injectable()
export class AppToastrService {

  constructor(private toastrService: ToastrService) {}

  success(message: string, override?: Partial<IndividualConfig>) {
    this.show('success', message, Object.assign({}, TOASTR_CONFIG, override || {}));
  }

  error(message: string, override?: Partial<IndividualConfig>) {
    this.show('error', message, Object.assign({}, TOASTR_CONFIG, override || {}));
  }

  warning(message: string, override?: Partial<IndividualConfig>) {
    this.show('warning', message, Object.assign({}, TOASTR_CONFIG, override || {}));
  }

  overlaycontainer(container: ToastContainerDirective) {
    this.toastrService.overlayContainer = container;
  }

  private show(
    type: 'success' | 'error' | 'warning',
    message: string,
    override?: Partial<IndividualConfig>,
  ) {
    this.toastrService[type](message, undefined, override);
  }
}
