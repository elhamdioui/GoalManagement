using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Data;
using System.Linq.Expressions;

namespace SothemaGoalManagement.API.Repositories
{
    public abstract class GMRepository<T> : IGMRepository<T> where T : class
    {
        protected DataContext RepositoryContext { get; set; }

        public GMRepository(DataContext repositoryContext)
        {
            this.RepositoryContext = repositoryContext;

        }
        public IQueryable<T> FindAll()
        {
            return this.RepositoryContext.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.RepositoryContext.Set<T>()
                .Where(expression);
        }

        public void Add(T entity)
        {
            this.RepositoryContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            this.RepositoryContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            this.RepositoryContext.Set<T>().Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await RepositoryContext.SaveChangesAsync() > 0;
        }
    }
}