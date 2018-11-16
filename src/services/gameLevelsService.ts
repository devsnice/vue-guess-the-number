interface IGameLevel {
  label: string;
  maxNumberRange: number;
}

interface IGameLevels {
  [levelName: string]: IGameLevel;
}

class GameLevelsService {
  private levels: IGameLevels;

  constructor() {
    this.levels = {};
  }

  public getLevels() {
    return Object.values(this.levels);
  }

  public editLevel(label: string, newSettings: IGameLevel) {
    if (!this.levels[label]) {
      throw new Error(`There're now label with label: ${label}`);
    } else {
      this.levels[label] = newSettings;
    }
  }

  public addLevel(label: string, maxNumberRange: number) {
    if (this.levels[label]) {
      throw new Error(`Level with this label exist: ${label}`);
    }

    this.levels[label] = {
      label,
      maxNumberRange
    };
  }
}

const GameLevels = new GameLevelsService();
