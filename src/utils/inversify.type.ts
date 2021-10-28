const INVERSIFY = {
  IClassRepository: Symbol.for('IClassRepository'),
  IClassService: Symbol.for('IClassService'),

  IUserRepository: Symbol.for('IUserRepository'),
  IUserService: Symbol.for('IUserService'),

  IRoleRepository: Symbol.for('IRoleRepository'),
  IRoleService: Symbol.for('IRoleService')
};

export { INVERSIFY };
