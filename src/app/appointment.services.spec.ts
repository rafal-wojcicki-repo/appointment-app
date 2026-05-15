import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppointmentService, Appointment } from './appointment.services';

describe('AppointmentService (BDD-style)', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppointmentService]
    });
    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send POST when adding an appointment and return created appointment (Given/When/Then)', () => {
    // Given
    const newAppt: Appointment = { title: 'Test', date: '2025-12-09', time: '09:00' };
    const mockResponse = { id: 1, ...newAppt };

    // When
    let result: any;
    service.addAppointment(newAppt).subscribe(res => {
      result = res;
    });

    // Then
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).be('POST');
    expect(req.request.body).equal(newAppt);
    req.flush(mockResponse);

    expect(result).equal(mockResponse);
  });

  it('should perform GET when fetching appointments (Given/When/Then)', () => {
    // Given
    const mockList = [
      { id: 1, title: 'A', date: '2025-12-01', time: '10:00' },
      { id: 2, title: 'B', date: '2025-12-02', time: '11:00' }
    ];

    // When
    let result: any;
    service.getAppointments().subscribe(res => {
      result = res;
    });

    // Then
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).be('GET');
    req.flush(mockList);

    expect(result).equal(mockList);
  });

  it('should call DELETE when deleting an appointment (Given/When/Then)', () => {
    // Given
    const idToDelete = 5;

    // When
    let deleted: any;
    service.deleteAppointment(idToDelete).subscribe(res => {
      deleted = res;
    });

    // Then
    const req = httpMock.expectOne(`${service.apiUrl}/${idToDelete}`);
    expect(req.request.method).be('DELETE');
    req.flush({ success: true });

    expect(deleted).equal({ success: true });
  });
});
