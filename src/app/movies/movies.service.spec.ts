import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../infra/entity/movie.entity';

class MockRepository {
  save = jest.fn();
  find = jest.fn();
  findOneBy = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}

describe('MoviesService', () => {
  let service: MoviesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useClass: MockRepository },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MockRepository>(getRepositoryToken(Movie));
  });

  // --------- CREATE  ---------

  describe('create', () => {
    it('should create and return a movie', async () => {
      const newMovie = {
        title: 'O menino e a garca',
        duration: '2h 04m',
        country: 'Japan',
        studio: 'Ghibli',
        release: '2024-02-22',
      };
      jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(() => Promise.resolve(newMovie));

      const movie = await service.create(newMovie);

      expect(movie).toBe(newMovie);
    });
  });

  // --------- FIND ALL  ---------

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = [
        {
          id: 'beebe797-d710-49d1-81e1-3d26a4305e31',
          title: 'O menino e a garca',
          duration: '2h 04m',
          country: 'Japan',
          studio: 'Ghibli',
          release: '2024-02-22',
        },
        {
          id: '44f8af42-c100-4330-aaac-36ff7af64c59',
          title: 'Princesa Mononoke',
          duration: '2h 14m',
          country: 'Japan',
          studio: 'Ghibli',
          release: '1999-12-25',
        },
      ];
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => Promise.resolve(result));

      const movies = await service.findAll();

      expect(movies).toEqual(result);
    });
  });

  // --------- FIND ONE  ---------

  describe('findOne', () => {
    it('should return an array of movies', async () => {
      const id = '44f8af42-c100-4330-aaac-36ff7af64c59';
      const result = {
        id: '44f8af42-c100-4330-aaac-36ff7af64c59',
        title: 'Princesa Mononoke',
        duration: '2h 14m',
        country: 'Japan',
        studio: 'Ghibli',
        release: '1999-12-25',
      };

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(result));

      const movie = await service.findOne(id);

      expect(movie).toEqual(result);
    });
  });

  // --------- UPDATE  ---------

  describe('update', () => {
    it('should update 1 entity in database', async () => {
      const result = 1;
      const id = '44f8af42-c100-4330-aaac-36ff7af64c59';
      const dto = {
        title: 'Princesa Mononoke',
        duration: '2h 14m',
        country: 'Japan',
        studio: 'Ghibli',
        release: '1999-12-25',
      };
      const mockResult = {
        affected: 1,
      };

      jest
        .spyOn(repository, 'update')
        .mockImplementationOnce(() => Promise.resolve(mockResult));

      const movie = await service.update(id, dto);

      expect(movie).toBe(result);
    });
  });

  // --------- DELETE  ---------

  describe('delete', () => {
    it('should delete 1 entity in database', async () => {
      const result = 1;
      const id = '44f8af42-c100-4330-aaac-36ff7af64c59';
      const mockResult = {
        affected: 1,
      };

      jest
        .spyOn(repository, 'delete')
        .mockImplementationOnce(() => Promise.resolve(mockResult));

      const movie = await service.remove(id);

      expect(movie).toBe(result);
    });
  });
});
