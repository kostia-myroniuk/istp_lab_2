using eshop.Models;
using NUnit.Framework;
using Moq;
using Microsoft.EntityFrameworkCore;
using eshop.Controllers;
using Microsoft.EntityFrameworkCore.Internal;
using EntityFrameworkCore3Mock;
using System.Linq;
using System;

namespace eshop.Tests
{
    public class Tests
    {
        public DbContextOptions<EShopContext> DummyOptions { get; } = new DbContextOptionsBuilder<EShopContext>().Options;

        [SetUp]
        public void Setup()
        {            
        }

        [Test]
        public void Add()
        {
            var initialEntities = new[]
            {
                new Manufacturer { Id = 0, Name = "Manufacturer 1", Address = "Earth"},
                new Manufacturer { Id = 1, Name = "Manufacturer 2", Address = "Mars"}  
            };

            var dbContextMock = new DbContextMock<EShopContext>(DummyOptions);
            var manufacturersDbSetMock = dbContextMock.CreateDbSetMock(x => x.Manufacturers, initialEntities);

            ManufacturersController mc = new ManufacturersController(dbContextMock.Object);
            _ = mc.PostManufacturer(new Manufacturer { Id = 2, Name = "Manufacturer 3", Address = "No adress" });

            Assert.IsTrue(dbContextMock.Object.Manufacturers.Any(m => m.Name == "Manufacturer 3"));
        }

        [Test]
        public void AddSameName()
        {
            var initialEntities = new[]
            {
                new Manufacturer { Id = 0, Name = "Manufacturer 1", Address = "Earth"},
                new Manufacturer { Id = 1, Name = "Manufacturer 2", Address = "Mars"}
            };

            var dbContextMock = new DbContextMock<EShopContext>(DummyOptions);
            var manufacturersDbSetMock = dbContextMock.CreateDbSetMock(x => x.Manufacturers, initialEntities);

            ManufacturersController mc = new ManufacturersController(dbContextMock.Object);
            _ = mc.PostManufacturer(new Manufacturer { Id = 2, Name = "Manufacturer 2", Address = "No adress" });

            Assert.AreEqual(dbContextMock.Object.Manufacturers.Count(m => m.Name == "Manufacturer 2"), 1);
        }

        [Test]
        public void AddEmpty()
        {
            var initialEntities = new[]
            {
                new Manufacturer { Id = 0, Name = "Manufacturer 1", Address = "Earth"},
                new Manufacturer { Id = 1, Name = "Manufacturer 2", Address = "Mars"}
            };

            var dbContextMock = new DbContextMock<EShopContext>(DummyOptions);
            var manufacturersDbSetMock = dbContextMock.CreateDbSetMock(x => x.Manufacturers, initialEntities);

            ManufacturersController mc = new ManufacturersController(dbContextMock.Object);
            _ = mc.PostManufacturer(new Manufacturer { Id = 2, Name = "", Address = "No adress" });

            Assert.IsFalse(dbContextMock.Object.Manufacturers.Any(m => m.Name == ""));
        }

        [Test]
        public void Delete()
        {
            var initialEntities = new[]
            {
                new Manufacturer { Id = 0, Name = "Manufacturer 1", Address = "Earth"},
                new Manufacturer { Id = 1, Name = "Manufacturer 2", Address = "Mars"}
            };

            var dbContextMock = new DbContextMock<EShopContext>(DummyOptions);
            var manufacturersDbSetMock = dbContextMock.CreateDbSetMock(x => x.Manufacturers, initialEntities);

            ManufacturersController mc = new ManufacturersController(dbContextMock.Object);
            _ = mc.PostManufacturer(new Manufacturer { Id = 2, Name = "Manufacturer 3", Address = "No adress" });
            _ = mc.DeleteManufacturer(2);

            Assert.IsFalse(dbContextMock.Object.Manufacturers.Any(m => m.Name == "Manufacturer 3"));
        }
    }
}