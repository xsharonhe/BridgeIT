#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np


# In[2]:


import os


# In[3]:


os.getcwd()


# In[4]:


os.listdir()


# In[5]:


haz = pd.read_csv("data/HazardousAreas.csv")


# In[6]:


haz.head()


# In[7]:


haz.rename(columns={"Geohash":"id", "Latitude": "lat", "Longitude": "lon", "City": "city", 
            "SeverityScore": "severity_score", "IncidentsTotal": "incidents_total"}, inplace=True)


# In[8]:


haz.drop(columns=["GeohashBounds", "Latitude_SW", "Longitude_SW",
                 "Longitude_NE", "Latitude_NE", "Location", 
                 "County", "State", "Country", "ISO_3166_2",
                 "UpdateDate", "Version"], inplace=True)


# In[28]:


haz.to_csv("hazardous_cleaned.csv", index=False)


# In[9]:


haz.head()


# In[10]:


dark = pd.read_csv("data/CellCoverageDarkSpots.csv")


# In[11]:


dark.head()


# In[12]:


dark.rename(columns={"Geohash":"id", "Latitude": "lat", "Longitude": "lon", "City": "city", 
            "AvgDropsPerMonth": "avg_drops", "PercentAffected": "percent_affected"}, inplace=True)


# In[13]:


dark.drop(columns=["GeohashBounds"], inplace=True)


# In[14]:


dark.head()


# In[35]:


dark.to_csv("dark_cleaned.csv", index=False)


# In[37]:


mob = pd.read_csv("data/COVIDMobility.csv")


# In[39]:


mob.isnull().sum()


# In[43]:


mob["id"] = mob["sub_region_2"] + "-" + mob["date"]


# In[44]:


mob.head()


# In[16]:


df = pd.read_csv("data/BorderWaitTimes.csv")


# In[231]:


d = pd.read_csv("data/BorderWaitTimes.csv")


# In[241]:


d.PortName.unique()


# In[242]:


d[d["PortName"] == "Cornwall"]


# In[22]:


df.drop(columns=["BorderId", "TripDirection", "AggregationMethod", "BorderZone",
                "ISO_3166_2", "AmericaBorderZone",
                "US_ISO_3166_2", "BorderGeohash", "Version"], inplace=True)


# In[34]:


df.drop(columns=["LocalHour", "LocalDate"], inplace=True)


# In[38]:


df.drop(columns=["BorderLongitude", "BorderLatitude"], inplace=True)


# In[39]:


df.dtypes


# In[40]:


df["UTC_Date"] = pd.to_datetime(df["UTC_Date"])


# In[43]:


df["Month"] = pd.DatetimeIndex(df["UTC_Date"]).month


# In[45]:


df["Day"] = pd.DatetimeIndex(df["UTC_Date"]).day


# In[48]:


df.drop(columns=["UTC_Date"], inplace=True)


# In[50]:


df.drop(columns=["AmericaPort"], inplace=True)


# In[74]:


df.head()


# In[59]:


df["DayType"].unique()


# In[69]:


categorical_data = df.copy()


# In[71]:


categorical_data.drop(columns=["PercentageOfBaselineTripVolume", "AverageDuration"], inplace=True)


# In[76]:


numerical_data = df.copy()
numerical_data.drop(columns=["PortName", "UTC_Hour", "DayType", "Month", "Day"], inplace=True)


# In[77]:


categorical_data_one_hot = pd.get_dummies(categorical_data, drop_first = True, dtype='int64')


# In[78]:


categorical_data_one_hot


# In[111]:


p = pd.concat([numerical_data, categorical_data_one_hot], axis=1)


# In[112]:


p["Is_UTC_Hour_4"] = 0


# In[113]:


p["Is_UTC_Hour_5"] = 0


# In[114]:


for row in range(0, 2000):
    if p.at[row, "UTC_Hour"] == 4:
        p.at[row, "Is_UTC_Hour_4"] = 1

for row in range(0, 2000):
    if p.at[row, "UTC_Hour"] == 5:
        p.at[row, "Is_UTC_Hour_5"] = 1


# In[115]:


p.drop(columns=["UTC_Hour", "Month", "Day"], inplace=True)


# In[51]:


import matplotlib.pyplot as plt
import seaborn as sns


# In[56]:


df.groupby("PortName")["AverageDuration"].median().plot()
plt.xticks(rotation=45)


# In[ ]:


## Clearly Windsor-Ambassador Bridge takes the longest


# In[60]:


df.groupby("DayType")["AverageDuration"].mean().plot()


# In[61]:


df.groupby("UTC_Hour")["AverageDuration"].mean().plot()


# In[62]:


df.groupby("Day")["AverageDuration"].mean().plot()


# In[63]:


df.groupby("Month")["AverageDuration"].mean().plot()


# In[21]:


df.UTC_Hour.unique()


# In[18]:


df.apply("nunique")


# In[108]:


processed = p.copy()


# In[109]:


# target variables:


# In[110]:


target = "AverageDuration"


# In[122]:


X = p.drop(columns=[target])
y = p[target]


# In[143]:


from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_validate
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import confusion_matrix, mean_squared_error, r2_score
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.utils import resample
from scipy.stats import randint as sp_randint


# In[123]:


X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(X, y, test_size=0.3, random_state=38)


# In[124]:


ind_vars = X.columns


# In[125]:


ind_vars


# In[127]:


model = LinearRegression()
model.fit(X_train_p, y_train_p)


# In[128]:


model.predict(X)[:10]


# In[137]:


pred = model.predict(X_test_p)


# In[142]:


mean_squared_error(y_test_p, pred)


# In[144]:


r2_score(y_test_p, pred)


# In[145]:


tree = DecisionTreeRegressor()
tree.fit(X_train_p, y_train_p)


# In[146]:


pred = tree.predict(X_test_p)


# In[147]:


mean_squared_error(y_test_p, pred)


# In[148]:


r2_score(y_test_p, pred)


# In[150]:


tree.score(X_train_p, y_train_p)


# In[156]:


forest = RandomForestRegressor()
forest.fit(X_train_p, y_train_p)


# In[157]:


pred = forest.predict(X_test_p)


# In[158]:


mean_squared_error(y_test_p, pred)


# In[159]:


r2_score(y_test_p, pred)


# In[160]:


forest.score(X_train_p, y_train_p)


# In[163]:


def evaluate_model(estimator):
    cv_results = cross_validate(estimator, 
                    X=X,                  
                    y=Y,                  
                    scoring="neg_mean_absolute_error",  
                          n_jobs=-1, cv=3,
                     return_train_score=True)
    return pd.DataFrame(cv_results).abs().mean().to_dict()


# In[162]:


RESULTS = {}


# In[164]:


RESULTS["lr"] = evaluate_model(LinearRegression())


# In[168]:


RESULTS["dt"] = evaluate_model(DecisionTreeRegressor(max_depth=5)) 


# In[170]:


RESULTS["forest"] = evaluate_model(RandomForestRegressor())


# In[173]:


from sklearn.tree import ExtraTreeRegressor
from sklearn.ensemble import BaggingRegressor


# In[174]:


estimator_bagging_random_tree = BaggingRegressor(n_estimators=100,
                                    base_estimator=ExtraTreeRegressor())
RESULTS["bagging_random_tree"] = evaluate_model(estimator_bagging_random_tree)


# In[175]:


pd.DataFrame.from_dict(RESULTS).T


# In[176]:


tree = ExtraTreeRegressor()


# In[178]:


tree.fit(X_train_p, y_train_p)


# In[179]:


pred = tree.predict(X_test_p)


# In[180]:


r2_score(y_test_p, pred)


# In[181]:


mean_squared_error(y_test_p, pred)


# In[182]:


tree.score(X_train_p, y_train_p)


# In[191]:


search_parameters_space_random_forest = {"n_estimators": sp_randint(75, 125),
             "max_depth": [3, 50],
            "min_samples_split": sp_randint(1, 50),
              "min_samples_leaf": sp_randint(1, 50)}


# In[202]:


random_search = RandomizedSearchCV(
    estimator=RandomForestRegressor(), 
    param_distributions=search_parameters_space_random_forest,
   scoring="neg_mean_absolute_error", n_jobs=-1, 
    n_iter=50)


# In[188]:


get_ipython().run_line_magic('pinfo', 'RandomForestRegressor')


# In[203]:


get_ipython().run_cell_magic('time', '', 'random_search.fit(X_train_p, y_train_p)')


# In[210]:


RESULTS["random_search_forest"] = evaluate_model(random_search)


# In[214]:


print(random_search.best_estimator_)


# In[216]:


pred = random_search.predict(X_test_p)


# In[211]:


pd.DataFrame.from_dict(RESULTS).T


# In[217]:


r2_score(y_test_p, pred)


# In[218]:


mean_squared_error(y_test_p, pred)


# In[224]:


import pickle


# In[221]:


forest = RandomForestRegressor(bootstrap=True, ccp_alpha=0.0, criterion='mse',
                      max_depth=50, max_features='auto', max_leaf_nodes=None,
                      max_samples=None, min_impurity_decrease=0.0,
                      min_impurity_split=None, min_samples_leaf=21,
                      min_samples_split=30, min_weight_fraction_leaf=0.0,
                      n_estimators=82, n_jobs=None, oob_score=False,
                      random_state=None, verbose=0, warm_start=False)


# In[229]:


forest.fit(X,y)
pickle.dump(forest, open('random_forest.pkl','wb'))


# In[228]:


p.drop(columns=[target])


# In[230]:


p


# In[ ]:




